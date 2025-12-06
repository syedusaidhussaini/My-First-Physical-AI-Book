---
id: lesson-02-remote-control
title: Remote Control and Monitoring
sidebar_position: 2
---

# Remote Control and Monitoring

## Learning Objectives

By the end of this lesson, you will:
- Build a web dashboard to monitor devices
- Implement remote commands for device control
- Create real-time notifications and alerts
- Deploy a complete IoT system (hardware + cloud + interface)
- Handle latency and connection failures

## Prerequisites

- Lesson 2.1: Sending Data to Cloud

**Estimated Duration**: 90-120 minutes

---

## Why This Matters

**Monitoring Only:**
- Know what's happening
- Analyze patterns
- Historical data

**Monitoring + Control:**
- React to events in real-time
- Adjust robot behavior remotely
- Emergency stop from anywhere
- Scale to hundreds of devices

---

## Architecture: Remote Control System

```
Your Computer                  Internet                    Device
┌──────────────┐              ┌────────┐              ┌──────────────┐
│  Dashboard   │ ────HTTP───→ │ Cloud  │ ────MQTT──→ │   Device     │
│  (Browser)   │              │ Server │              │ (Robot/Sensor│
│              │ ←───JSON──── │        │ ←──Update─── │   )          │
└──────────────┘              └────────┘              └──────────────┘

1. Dashboard sends command: {"action": "move", "direction": "forward"}
2. Server stores in queue
3. Device polls/receives command
4. Device executes action
5. Device reports status
6. Dashboard updates in real-time
```

---

## Web Dashboard (HTML + JavaScript)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Robot Control Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        h1 {
            color: white;
            margin-bottom: 30px;
            text-align: center;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }

        .card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .card h2 {
            color: #333;
            margin-bottom: 15px;
            font-size: 18px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }

        /* Status Indicators */
        .status {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 0;
            padding: 10px;
            background: #f5f5f5;
            border-radius: 5px;
        }

        .status-label {
            font-weight: bold;
            color: #333;
        }

        .status-value {
            font-size: 18px;
            font-weight: bold;
        }

        .online {
            color: #4caf50;
        }

        .offline {
            color: #f44336;
        }

        /* Control Buttons */
        .controls {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-top: 15px;
        }

        button {
            padding: 12px 20px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: bold;
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }

        .btn-primary:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-danger {
            background: #f44336;
            color: white;
            grid-column: 1 / -1;
        }

        .btn-danger:hover {
            background: #d32f2f;
        }

        .btn-disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* Sensor Data Display */
        .sensor-data {
            display: grid;
            gap: 10px;
        }

        .sensor-item {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            background: #f9f9f9;
            border-left: 4px solid #667eea;
            border-radius: 3px;
        }

        .sensor-label {
            color: #666;
        }

        .sensor-value {
            font-weight: bold;
            color: #333;
        }

        /* Chart Container */
        .chart-container {
            position: relative;
            height: 300px;
            margin-top: 15px;
        }

        /* Alert Messages */
        .alert {
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 5px;
        }

        .alert-info {
            background: #e3f2fd;
            color: #1976d2;
            border-left: 4px solid #1976d2;
        }

        .alert-success {
            background: #e8f5e9;
            color: #388e3c;
            border-left: 4px solid #388e3c;
        }

        .alert-error {
            background: #ffebee;
            color: #c62828;
            border-left: 4px solid #c62828;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🤖 Robot Control Dashboard</h1>

        <div class="grid">
            <!-- Device Status Card -->
            <div class="card">
                <h2>Device Status</h2>
                <div class="status">
                    <span class="status-label">Connection:</span>
                    <span class="status-value online" id="connection">🟢 Online</span>
                </div>
                <div class="status">
                    <span class="status-label">Battery:</span>
                    <span class="status-value" id="battery">75%</span>
                </div>
                <div class="status">
                    <span class="status-label">Last Update:</span>
                    <span class="status-value" id="lastUpdate">Just now</span>
                </div>
            </div>

            <!-- Robot Controls -->
            <div class="card">
                <h2>Robot Movement</h2>
                <div class="controls">
                    <button class="btn-primary" onclick="sendCommand('moveForward')">⬆️ Forward</button>
                    <button class="btn-primary" onclick="sendCommand('moveBackward')">⬇️ Backward</button>
                    <button class="btn-primary" onclick="sendCommand('turnLeft')">⬅️ Left</button>
                    <button class="btn-primary" onclick="sendCommand('turnRight')">➡️ Right</button>
                    <button class="btn-danger" onclick="sendCommand('emergencyStop')">🛑 STOP</button>
                </div>
            </div>

            <!-- Sensor Data -->
            <div class="card">
                <h2>Sensor Data</h2>
                <div class="sensor-data">
                    <div class="sensor-item">
                        <span class="sensor-label">Temperature:</span>
                        <span class="sensor-value" id="temp">--°C</span>
                    </div>
                    <div class="sensor-item">
                        <span class="sensor-label">Humidity:</span>
                        <span class="sensor-value" id="humidity">--%</span>
                    </div>
                    <div class="sensor-item">
                        <span class="sensor-label">Distance:</span>
                        <span class="sensor-value" id="distance">-- cm</span>
                    </div>
                </div>
            </div>

            <!-- Command History -->
            <div class="card">
                <h2>Recent Commands</h2>
                <div id="commandHistory" style="max-height: 250px; overflow-y: auto;">
                    <p style="color: #999; text-align: center;">No commands yet</p>
                </div>
            </div>
        </div>
    </div>

    <script>
        // API Configuration
        const API_BASE = 'http://your-server.com/api';
        const DEVICE_ID = 'robot_001';

        // Update interval (ms)
        const UPDATE_INTERVAL = 2000;

        // Command history
        let commandLog = [];

        // Send command to device
        function sendCommand(action) {
            const command = {
                device_id: DEVICE_ID,
                action: action,
                timestamp: new Date().toISOString()
            };

            console.log('Sending command:', command);

            fetch(`${API_BASE}/command`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(command)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data);
                addCommandToHistory(action, 'sent');
            })
            .catch(error => {
                console.error('Error:', error);
                addCommandToHistory(action, 'failed');
            });
        }

        // Fetch device status
        function updateStatus() {
            fetch(`${API_BASE}/status/${DEVICE_ID}`)
                .then(response => response.json())
                .then(data => {
                    // Update connection status
                    const conn = document.getElementById('connection');
                    if (data.online) {
                        conn.textContent = '🟢 Online';
                        conn.className = 'status-value online';
                    } else {
                        conn.textContent = '🔴 Offline';
                        conn.className = 'status-value offline';
                    }

                    // Update battery
                    document.getElementById('battery').textContent = data.battery + '%';

                    // Update last update time
                    const lastUpdate = new Date(data.lastUpdate).toLocaleTimeString();
                    document.getElementById('lastUpdate').textContent = lastUpdate;
                })
                .catch(error => {
                    console.error('Status update failed:', error);
                    const conn = document.getElementById('connection');
                    conn.textContent = '🔴 Offline';
                    conn.className = 'status-value offline';
                });
        }

        // Fetch sensor data
        function updateSensorData() {
            fetch(`${API_BASE}/sensors/${DEVICE_ID}`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('temp').textContent =
                        data.temperature.toFixed(1) + '°C';
                    document.getElementById('humidity').textContent =
                        data.humidity.toFixed(1) + '%';
                    document.getElementById('distance').textContent =
                        data.distance + ' cm';
                })
                .catch(error => {
                    console.error('Sensor data update failed:', error);
                });
        }

        // Add command to history
        function addCommandToHistory(action, status) {
            const time = new Date().toLocaleTimeString();
            const entry = `<div style="padding: 8px; border-bottom: 1px solid #eee;">
                <span style="color: #999; font-size: 12px;">${time}</span>
                <strong>${action}</strong>
                <span style="color: ${status === 'sent' ? '#4caf50' : '#f44336'};">
                    ${status === 'sent' ? '✓' : '✗'}
                </span>
            </div>`;

            const history = document.getElementById('commandHistory');
            if (history.firstChild.tagName !== 'DIV') {
                history.innerHTML = '';
            }
            history.insertAdjacentHTML('afterbegin', entry);

            // Keep only last 10 commands
            while (history.children.length > 10) {
                history.removeChild(history.lastChild);
            }
        }

        // Initialize polling
        setInterval(updateStatus, UPDATE_INTERVAL);
        setInterval(updateSensorData, UPDATE_INTERVAL);

        // Initial update
        updateStatus();
        updateSensorData();

        console.log('✓ Dashboard initialized');
    </script>
</body>
</html>
```

---

## Backend API (Node.js + Express)

```javascript
const express = require('express');
const mqtt = require('mqtt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MQTT Connection
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');

// In-memory storage (replace with database for production)
const deviceStates = {
    'robot_001': {
        online: true,
        battery: 75,
        lastUpdate: Date.now(),
        sensors: {
            temperature: 24.5,
            humidity: 65,
            distance: 0
        }
    }
};

mqttClient.on('connect', () => {
    console.log('✓ Connected to MQTT broker');
    mqttClient.subscribe('sensors/+/status');
    mqttClient.subscribe('sensors/+/data');
});

mqttClient.on('message', (topic, message) => {
    try {
        const data = JSON.parse(message.toString());
        const parts = topic.split('/');
        const deviceId = parts[1];

        if (topic.includes('/status')) {
            deviceStates[deviceId].online = data.online;
            deviceStates[deviceId].battery = data.battery;
            deviceStates[deviceId].lastUpdate = Date.now();
        } else if (topic.includes('/data')) {
            deviceStates[deviceId].sensors = data;
        }

        console.log(`Updated ${deviceId}:`, deviceStates[deviceId]);
    } catch (error) {
        console.error('Error parsing message:', error);
    }
});

// API Endpoints

// Get device status
app.get('/api/status/:deviceId', (req, res) => {
    const device = deviceStates[req.params.deviceId];
    if (device) {
        res.json({
            ...device,
            online: Date.now() - device.lastUpdate < 10000 // Timeout after 10s
        });
    } else {
        res.status(404).json({ error: 'Device not found' });
    }
});

// Get sensor data
app.get('/api/sensors/:deviceId', (req, res) => {
    const device = deviceStates[req.params.deviceId];
    if (device) {
        res.json(device.sensors);
    } else {
        res.status(404).json({ error: 'Device not found' });
    }
});

// Send command to device
app.post('/api/command', (req, res) => {
    const { device_id, action } = req.body;

    // Publish command to device
    mqttClient.publish(
        `commands/${device_id}`,
        JSON.stringify({ action, timestamp: Date.now() })
    );

    console.log(`Command sent to ${device_id}: ${action}`);

    res.json({
        success: true,
        message: 'Command sent',
        device_id,
        action
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
});
```

---

## Real-Time Alerts

```python
# Send alerts when conditions are met
import smtplib
from email.mime.text import MIMEText

def check_alert_conditions(sensor_data):
    """Check if any alert conditions are triggered"""

    alerts = []

    # Temperature alert
    if sensor_data['temperature'] > 30:
        alerts.append({
            'type': 'HIGH_TEMP',
            'severity': 'warning',
            'message': f"Temperature too high: {sensor_data['temperature']}°C"
        })

    # Battery alert
    if sensor_data['battery'] < 20:
        alerts.append({
            'type': 'LOW_BATTERY',
            'severity': 'critical',
            'message': f"Battery low: {sensor_data['battery']}%"
        })

    # Connection alert
    if not sensor_data['connected']:
        alerts.append({
            'type': 'DISCONNECTED',
            'severity': 'critical',
            'message': 'Device disconnected'
        })

    # Send alerts
    for alert in alerts:
        send_alert(alert)

def send_alert(alert):
    """Send alert via email"""
    sender = 'alerts@myiot.com'
    recipient = 'user@example.com'

    subject = f"[{alert['severity'].upper()}] {alert['type']}"
    body = alert['message']

    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = recipient

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(sender, 'password')
        server.send_message(msg)

    print(f"✓ Alert sent: {alert['message']}")
```

---

## Handling Offline Scenarios

```cpp
// Device should handle disconnections gracefully

void handleOffline() {
  // 1. Store data locally
  logSensorDataSD("sensor_log.csv", temperature, humidity);

  // 2. Retry connection
  int retries = 0;
  while (!client.connected() && retries < 10) {
    delay(5000);
    reconnectMQTT();
    retries++;
  }

  // 3. If still offline, enter safe mode
  if (!client.connected()) {
    enterSafeMode();  // Stop moving, just log data
  }

  // 4. When back online, upload queued data
  if (client.connected()) {
    uploadQueuedData();
  }
}
```

---

## What's Next

- Multi-device management
- Advanced analytics and ML
- 5G IoT networks
- Edge computing
- Check [Further Reading](/docs/resources/further-reading) for more

