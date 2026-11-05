import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from satellite_service import SatelliteImageryService

load_dotenv()

app = Flask(__name__)
CORS(app)

PORT = int(os.environ.get("PORT", 5001))

@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "status": "online",
        "service": "SugarCane Satellite Imagery & AI Yield Prediction Service",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "predict": "POST /predict"
        }
    })

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "service": "satellite-imagery-api"}), 200

@app.route("/predict", methods=["POST"])
def predict():
    """
    Predict crop health indices and sugarcane yield for a given field boundary.
    Accepts:
      - { "boundary": { "type": "Polygon", "coordinates": [...] }, "from": "YYYY-MM-DD" }
      - Or { "slot_id": "...", "user_id": "..." }
    """
    try:
        data = request.get_json(silent=True) or {}
        boundary = data.get("boundary")
        from_date = data.get("from")

        # Handle requests that pass coordinates or default fallback
        analysis = SatelliteImageryService.analyze_field(boundary, from_date)

        # Include slot_id or user_id in response if supplied
        if "slot_id" in data:
            analysis["slot_id"] = data["slot_id"]
        if "user_id" in data:
            analysis["user_id"] = data["user_id"]

        return jsonify(analysis), 200

    except Exception as e:
        return jsonify({
            "error": "Failed to compute satellite imagery prediction",
            "message": str(e)
        }), 500

if __name__ == "__main__":
    print(f">> SugarCane Satellite Imagery API running on http://localhost:{PORT}")
    app.run(host="0.0.0.0", port=PORT, debug=True)
