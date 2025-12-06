---
id: lesson-01-cloud-integration
title: Sending Data to Cloud
sidebar_position: 1
---

# Sending Data to Cloud (IoT Integration)

## Learning Objectives

By the end of this lesson, you will:
- Understand IoT architecture and cloud platforms
- Connect devices to cloud services (AWS IoT, Google Cloud, Azure)
- Stream real-time sensor data
- Store historical data in databases
- Build cloud dashboards for monitoring

## Prerequisites

- Module 1, Lesson 1.2: Data filtering and storage
- Module 2, Lesson 1.1: Robot navigation (optional)

**Estimated Duration**: 90-120 minutes

---

## Why This Matters

**Local Storage:**
- Limited by device memory
- Difficult to analyze
- Hard to share with others

**Cloud Storage:**
- Unlimited scalability
- Easy analytics and visualization
- Remote monitoring from anywhere
- Historical data for ML training
- Multiple device coordination

---

## IoT Architecture

```
Your Device              WiFi/Internet           Cloud Platform
┌──────────────┐                           ┌─────────────────┐
│   Sensors    │                           │   IoT Hub       │
└──────┬───────┘                           │   (Receives)    │
       │                                   └────────┬────────┘
       │ Read sensor data                           │
       ↓                                            │
┌──────────────┐        HTTP/MQTT          ┌───────┴────────┐
│   Arduino    │ ─────────────────────→    │   Database     │
│ Raspberry Pi │ ←─────────────────────    │   (Stores)     │
└──────┬───────┘        Messages           └───────┬────────┘
       │                                            │
       │ Control signal                             │
       ↓                                     ┌───────┴────────┐
       Motors/LEDs                          │  Dashboard     │
                                            │  (Visualize)   │
                                            └────────────────┘
```

---

## Communication Protocols

### MQTT (Lightweight, IoT-optimized)

**Publish-Subscribe Model:**
- Device "publishes" to topic: `sensors/room1/temperature`
- Server "subscribes" to that topic
- Very efficient, small payloads

```
Client connects to Broker:
mqtt://broker.hivemq.com:1883

Topic hierarchy:
sensors/
  ├── living_room/
  │   ├── temperature
  │   ├── humidity
  │   └── co2
  ├── bedroom/
  │   └── temperature
  └── kitchen/
      └── motion
```

### HTTP (REST API)

**Request-Response Model:**
- Device sends HTTP POST with sensor data
- Server responds with confirmation
- Heavier but more widely supported

```
POST /api/sensors/data
Host: api.example.com
Content-Type: application/json

{
  "device_id": "robot_001",
  "timestamp": "2025-12-07T10:30:45Z",
  "sensors": {
    "temperature": 24.5,
    "humidity": 65,
    "distance": 45
  }
}
```

---

## Arduino/ESP8266 to Cloud (Using MQTT)

### Arduino Implementation with WiFi

```cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

// WiFi credentials
const char* SSID = "YOUR_WIFI_SSID";
const char* PASSWORD = "YOUR_WIFI_PASSWORD";

// MQTT Broker
const char* MQTT_SERVER = "broker.hivemq.com";
const int MQTT_PORT = 1883;

// DHT Sensor
#define DHT_PIN 23
#define DHT_TYPE DHT22
DHT dht(DHT_PIN, DHT_TYPE);

// MQTT Topics
const char* TEMP_TOPIC = "sensors/robot01/temperature";
const char* HUMIDITY_TOPIC = "sensors/robot01/humidity";
const char* STATUS_TOPIC = "sensors/robot01/status";

WiFiClient espClient;
PubSubClient client(espClient);

void setupWiFi() {
  Serial.print("Connecting to WiFi: ");
  Serial.println(SSID);

  WiFi.begin(SSID, PASSWORD);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✓ WiFi connected!");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n✗ Failed to connect WiFi!");
  }
}

void setupMQTT() {
  client.setServer(MQTT_SERVER, MQTT_PORT);
  client.setCallback(onMessageReceived);
}

void reconnectMQTT() {
  while (!client.connected()) {
    Serial.print("Connecting to MQTT broker... ");

    if (client.connect("ESP32_Robot_01")) {
      Serial.println("✓ Connected!");
      // Subscribe to topics
      client.subscribe("sensors/robot01/command");
      // Publish online status
      client.publish(STATUS_TOPIC, "online");
    } else {
      Serial.print("✗ Failed, rc=");
      Serial.println(client.state());
      delay(5000);
    }
  }
}

void onMessageReceived(char* topic, byte* payload, unsigned int length) {
  String command = "";
  for (int i = 0; i < length; i++) {
    command += (char)payload[i];
  }

  Serial.print("Message received [");
  Serial.print(topic);
  Serial.print("]: ");
  Serial.println(command);

  if (command == "start") {
    Serial.println("Command: START");
    // Execute action
  } else if (command == "stop") {
    Serial.println("Command: STOP");
    // Execute action
  }
}

void publishSensorData() {
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temp) || isnan(humidity)) {
    Serial.println("✗ Failed to read DHT sensor!");
    return;
  }

  // Create JSON payloads
  char tempPayload[10];
  char humPayload[10];

  dtostrf(temp, 5, 2, tempPayload);
  dtostrf(humidity, 5, 2, humPayload);

  // Publish to MQTT
  client.publish(TEMP_TOPIC, tempPayload);
  client.publish(HUMIDITY_TOPIC, humPayload);

  Serial.print("📤 Published - Temp: ");
  Serial.print(tempPayload);
  Serial.print("°C, Humidity: ");
  Serial.print(humPayload);
  Serial.println("%");
}

void setup() {
  Serial.begin(115200);
  delay(100);

  Serial.println("\n\nStarting IoT Device...");

  dht.begin();
  setupWiFi();
  setupMQTT();
}

void loop() {
  if (!client.connected()) {
    reconnectMQTT();
  }

  client.loop();

  // Publish sensor data every 10 seconds
  static unsigned long lastPublish = 0;
  if (millis() - lastPublish > 10000) {
    publishSensorData();
    lastPublish = millis();
  }
}
```

---

## Raspberry Pi to Cloud (Python)

### Using AWS IoT Core

```python
import json
import time
import ssl
import paho.mqtt.client as mqtt
import Adafruit_DHT

# AWS IoT Configuration
MQTT_BROKER = "YOUR_AWS_IOT_ENDPOINT.iot.us-east-1.amazonaws.com"
MQTT_PORT = 8883
CLIENT_ID = "raspberry_pi_001"

# Certificates (download from AWS IoT)
CA_CERT = "/home/pi/certs/AmazonRootCA1.pem"
CLIENT_CERT = "/home/pi/certs/device-certificate.pem.crt"
CLIENT_KEY = "/home/pi/certs/private.pem.key"

# DHT Sensor
SENSOR = Adafruit_DHT.DHT22
GPIO_PIN = 4

# MQTT Topics
PUBLISH_TOPIC = "sensors/raspberry_pi_001/data"
SUBSCRIBE_TOPIC = "sensors/raspberry_pi_001/commands"

class IoTDevice:
    def __init__(self):
        self.client = mqtt.Client(client_id=CLIENT_ID)
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        self.client.on_disconnect = self.on_disconnect

    def setup_tls(self):
        """Configure TLS/SSL for AWS IoT"""
        self.client.tls_set(
            ca_certs=CA_CERT,
            certfile=CLIENT_CERT,
            keyfile=CLIENT_KEY,
            cert_reqs=ssl.CERT_REQUIRED,
            tls_version=ssl.PROTOCOL_TLSv1_2,
            ciphers=None
        )
        self.client.tls_insecure = False

    def on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            print("✓ Connected to AWS IoT Core!")
            self.client.subscribe(SUBSCRIBE_TOPIC)
        else:
            print(f"✗ Connection failed with code {rc}")

    def on_message(self, client, userdata, msg):
        print(f"\n📨 Message received [{msg.topic}]:")
        print(msg.payload.decode())

        try:
            payload = json.loads(msg.payload)
            if payload.get("action") == "start":
                print("→ Starting sensor logging...")
            elif payload.get("action") == "stop":
                print("→ Stopping sensor logging...")
        except:
            pass

    def on_disconnect(self, client, userdata, rc):
        if rc != 0:
            print(f"⚠️  Unexpected disconnection: {rc}")

    def connect_to_broker(self):
        """Connect to AWS IoT"""
        print(f"Connecting to {MQTT_BROKER}...")
        self.setup_tls()
        self.client.connect(MQTT_BROKER, MQTT_PORT, keepalive=60)
        self.client.loop_start()

    def read_sensor(self):
        """Read DHT22 sensor"""
        humidity, temp = Adafruit_DHT.read_retry(SENSOR, GPIO_PIN)

        if humidity is not None and temp is not None:
            return {
                "temperature": round(temp, 2),
                "humidity": round(humidity, 2),
                "timestamp": int(time.time())
            }
        else:
            print("✗ Failed to read sensor!")
            return None

    def publish_data(self):
        """Publish sensor data to AWS IoT"""
        data = self.read_sensor()

        if data:
            payload = json.dumps(data)
            self.client.publish(PUBLISH_TOPIC, payload)

            print(f"📤 Published: {payload}")

    def run(self):
        """Main loop"""
        self.connect_to_broker()

        try:
            print("\nStarting IoT device...")
            while True:
                self.publish_data()
                time.sleep(10)  # Publish every 10 seconds

        except KeyboardInterrupt:
            print("\n\nShutting down...")
        finally:
            self.client.loop_stop()
            self.client.disconnect()

# Example usage
if __name__ == "__main__":
    device = IoTDevice()
    device.run()
```

### Using Google Cloud IoT

```python
import json
import time
import jwt
import requests
from datetime import datetime

class GoogleCloudIoT:
    def __init__(self, project_id, cloud_region, registry_id, device_id):
        self.project_id = project_id
        self.cloud_region = cloud_region
        self.registry_id = registry_id
        self.device_id = device_id

        self.base_url = (
            f"https://cloudiotdevice.googleapis.com/v1/projects/"
            f"{project_id}/locations/{cloud_region}/"
            f"registries/{registry_id}/devices/{device_id}"
        )

    def create_jwt(self, private_key_file):
        """Create JWT token for authentication"""
        token = {
            'iat': datetime.utcnow(),
            'exp': datetime.utcnow() + timedelta(hours=1),
            'aud': self.project_id
        }

        with open(private_key_file, 'r') as f:
            private_key = f.read()

        return jwt.encode(
            token,
            private_key,
            algorithm='RS256'
        )

    def publish_data(self, data, token):
        """Publish data to Google Cloud"""
        headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }

        payload = {
            'version_string': '1.0',
            'binary_data': None,
            'text_data': json.dumps(data)
        }

        response = requests.post(
            f"{self.base_url}:publishEvent",
            json=payload,
            headers=headers
        )

        if response.status_code == 200:
            print("✓ Data published to Google Cloud")
        else:
            print(f"✗ Error: {response.status_code}")
            print(response.text)

# Example usage
if __name__ == "__main__":
    iot = GoogleCloudIoT(
        project_id="my-project",
        cloud_region="us-central1",
        registry_id="my-registry",
        device_id="raspberry_pi_001"
    )
```

---

## Database: Time-Series Data Storage

```sql
-- InfluxDB: Optimized for sensor data
CREATE DATABASE sensors;

-- Insert sensor reading
INSERT INTO temperature,device=robot01 value=24.5 1702027800000000000
INSERT INTO humidity,device=robot01 value=65.2 1702027800000000000

-- Query last 24 hours
SELECT * FROM temperature
WHERE device='robot01'
AND time > now() - 24h
ORDER BY time DESC;

-- Aggregate: Average per hour
SELECT MEAN(value)
FROM temperature
WHERE device='robot01'
GROUP BY time(1h);
```

---

## Cloud Dashboard Example

Visualize your data with these platforms:
- **AWS IoT Core** + CloudWatch
- **Google Cloud** + Looker Studio
- **Azure** + Power BI
- **Open Source** + Grafana + InfluxDB

---

## What's Next

- Real-time alerts (temperature too high)
- Machine learning on historical data
- Multi-device coordination
- Check [Further Reading](/docs/resources/further-reading) for cloud platforms

