---
id: lesson-01-robot-navigation
title: Robot Navigation and Path Planning
sidebar_position: 1
---

# Robot Navigation and Path Planning

## Learning Objectives

By the end of this lesson, you will:
- Understand coordinate systems and position tracking
- Implement basic path planning algorithms (Dijkstra, A*)
- Build a 2-wheel differential drive robot
- Create mapping systems for robot navigation
- Implement localization techniques (SLAM basics)

## Prerequisites

- Module 1: All lessons (sensors, filtering, motor control, servo control)

**Estimated Duration**: 90-120 minutes

---

## Why This Matters

Autonomous robots need to know:
1. **Where am I?** (Localization)
2. **Where do I want to go?** (Goal)
3. **How do I get there?** (Path Planning)
4. **Can I get there without crashing?** (Obstacle avoidance)

This lesson combines all previous concepts into a working autonomous system!

---

## Coordinate Systems and Robot Kinematics

### Understanding 2D Coordinates

```
    Y (North)
    ↑
    │
    └──→ X (East)

Robot Position: (x, y, θ)
- x, y: position in 2D space
- θ: heading angle (0-360°)
```

### Differential Drive Kinematics

For a 2-wheel robot:
```
       Left Motor
           ↑
    ┌──────────────┐
    │              │
    │    ROBOT     │  θ (heading)
    │              │
    └──────────────┘
           ↓
       Right Motor

Distance between wheels: L
Left wheel speed: Vl
Right wheel speed: Vr

Forward velocity: V = (Vl + Vr) / 2
Angular velocity: ω = (Vr - Vl) / L
```

---

## Basic Path Planning: Grid-Based A* Algorithm

### Algorithm Overview

A* finds shortest path by combining:
- **g(n)**: Cost from start to current node
- **h(n)**: Estimated cost from current node to goal
- **f(n)**: g(n) + h(n) (total estimated cost)

### Arduino Implementation

```cpp
#include <queue>
#include <vector>

// Grid size: 10x10 cells
#define GRID_WIDTH 10
#define GRID_HEIGHT 10
#define CELL_SIZE 0.3  // 30cm per cell

struct Node {
  int x, y;
  float g, h, f;

  bool operator<(const Node& other) const {
    return f > other.f;  // Min heap
  }
};

// Grid: 0 = free, 1 = obstacle, 2 = planned path
uint8_t grid[GRID_WIDTH][GRID_HEIGHT];

// Heuristic: Manhattan distance
float heuristic(int x, int y, int goalX, int goalY) {
  return abs(x - goalX) + abs(y - goalY);
}

// Check if cell is valid and not visited
bool isValid(int x, int y) {
  return x >= 0 && x < GRID_WIDTH &&
         y >= 0 && y < GRID_HEIGHT &&
         grid[x][y] != 1;  // Not obstacle
}

void planPath(int startX, int startY, int goalX, int goalY) {
  std::priority_queue<Node> openList;
  bool visited[GRID_WIDTH][GRID_HEIGHT] = {false};

  Node startNode = {startX, startY, 0,
                    heuristic(startX, startY, goalX, goalY), 0};
  startNode.f = startNode.h;

  openList.push(startNode);

  int directions[4][2] = {{0,1}, {1,0}, {0,-1}, {-1,0}};  // N,E,S,W

  while (!openList.empty()) {
    Node current = openList.top();
    openList.pop();

    if (current.x == goalX && current.y == goalY) {
      // Path found! Mark it
      grid[current.x][current.y] = 2;
      Serial.println("Path found!");
      return;
    }

    visited[current.x][current.y] = true;

    // Check all neighbors
    for (int i = 0; i < 4; i++) {
      int newX = current.x + directions[i][0];
      int newY = current.y + directions[i][1];

      if (isValid(newX, newY) && !visited[newX][newY]) {
        float newG = current.g + 1.0;
        float newH = heuristic(newX, newY, goalX, goalY);

        Node neighbor = {newX, newY, newG, newH, 0};
        neighbor.f = newG + newH;

        openList.push(neighbor);
      }
    }
  }

  Serial.println("No path found!");
}
```

### Python Raspberry Pi Version

```python
import heapq
from collections import defaultdict

class PathPlanner:
    def __init__(self, grid_width=10, grid_height=10, cell_size=0.3):
        self.width = grid_width
        self.height = grid_height
        self.cell_size = cell_size  # meters
        self.grid = [[0 for _ in range(grid_width)] for _ in range(grid_height)]
        self.path = []

    def heuristic(self, pos, goal):
        """Manhattan distance heuristic"""
        return abs(pos[0] - goal[0]) + abs(pos[1] - goal[1])

    def is_valid(self, x, y):
        """Check if cell is valid (not obstacle)"""
        return (0 <= x < self.width and
                0 <= y < self.height and
                self.grid[y][x] != 1)

    def find_path(self, start, goal):
        """A* pathfinding algorithm"""
        open_list = []
        heapq.heappush(open_list, (0, start))

        came_from = {}
        g_score = {start: 0}
        f_score = {start: self.heuristic(start, goal)}

        closed_set = set()

        while open_list:
            _, current = heapq.heappop(open_list)

            if current == goal:
                # Reconstruct path
                self.path = [current]
                while current in came_from:
                    current = came_from[current]
                    self.path.insert(0, current)
                print(f"✓ Path found with {len(self.path)} waypoints")
                return self.path

            closed_set.add(current)

            # Check all 4 neighbors (N, E, S, W)
            for dx, dy in [(0,1), (1,0), (0,-1), (-1,0)]:
                neighbor = (current[0] + dx, current[1] + dy)

                if not self.is_valid(neighbor[0], neighbor[1]):
                    continue

                if neighbor in closed_set:
                    continue

                tentative_g = g_score[current] + 1

                if neighbor not in g_score or tentative_g < g_score[neighbor]:
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_g
                    f_score[neighbor] = g_score[neighbor] + \
                                        self.heuristic(neighbor, goal)

                    if neighbor not in [n[1] for n in open_list]:
                        heapq.heappush(open_list,
                                      (f_score[neighbor], neighbor))

        print("✗ No path found!")
        return None
```

---

## Hands-On Project: 2-Wheel Robot Navigation

### Hardware Setup

```
┌──────────────────┐
│   RASPBERRY PI   │
│   (Master)       │
└─────────┬────────┘
          │ I2C/GPIO
    ┌─────┴─────┐
    │  Motor    │
    │  Driver   │
    │  (L298N)  │
    └─────┬─────┘
      ┌───┴───┐
      │       │
    Motor   Motor
    (Left) (Right)

Plus sensors:
- Encoder sensors (left/right wheel)
- Ultrasonic range sensor (front)
- IMU (gyro for heading)
```

### Python Control Code

```python
import RPi.GPIO as GPIO
import time
from enum import Enum

class Direction(Enum):
    FORWARD = 1
    BACKWARD = 2
    LEFT = 3
    RIGHT = 4
    STOP = 0

class DifferentialDriveRobot:
    def __init__(self, left_pin1=17, left_pin2=27,
                 right_pin1=23, right_pin2=24,
                 wheel_distance=0.15, wheel_radius=0.03):
        """
        Initialize 2-wheel robot controller
        wheel_distance: distance between wheels (m)
        wheel_radius: wheel radius (m)
        """
        self.left_pin1 = left_pin1
        self.left_pin2 = left_pin2
        self.right_pin1 = right_pin1
        self.right_pin2 = right_pin2
        self.wheel_distance = wheel_distance
        self.wheel_radius = wheel_radius

        # Position tracking (odometry)
        self.x = 0.0  # meters
        self.y = 0.0  # meters
        self.theta = 0.0  # radians (0-2π)

        # Setup GPIO
        GPIO.setmode(GPIO.BCM)
        GPIO.setup([left_pin1, left_pin2, right_pin1, right_pin2],
                   GPIO.OUT)
        self.left_pwm = GPIO.PWM(left_pin1, 1000)
        self.right_pwm = GPIO.PWM(right_pin1, 1000)
        self.left_pwm.start(0)
        self.right_pwm.start(0)

    def move(self, direction, speed=100, duration=1.0):
        """Move robot in direction with PWM speed"""
        if direction == Direction.FORWARD:
            self.left_pwm.ChangeDutyCycle(speed)
            self.right_pwm.ChangeDutyCycle(speed)
            GPIO.output(self.left_pin2, GPIO.LOW)
            GPIO.output(self.right_pin2, GPIO.LOW)

        elif direction == Direction.BACKWARD:
            self.left_pwm.ChangeDutyCycle(speed)
            self.right_pwm.ChangeDutyCycle(speed)
            GPIO.output(self.left_pin2, GPIO.HIGH)
            GPIO.output(self.right_pin2, GPIO.HIGH)

        elif direction == Direction.LEFT:
            self.left_pwm.ChangeDutyCycle(speed * 0.5)  # Slow left
            self.right_pwm.ChangeDutyCycle(speed)       # Full right
            GPIO.output(self.left_pin2, GPIO.LOW)
            GPIO.output(self.right_pin2, GPIO.LOW)

        elif direction == Direction.RIGHT:
            self.left_pwm.ChangeDutyCycle(speed)        # Full left
            self.right_pwm.ChangeDutyCycle(speed * 0.5) # Slow right
            GPIO.output(self.left_pin2, GPIO.LOW)
            GPIO.output(self.right_pin2, GPIO.LOW)

        elif direction == Direction.STOP:
            self.left_pwm.ChangeDutyCycle(0)
            self.right_pwm.ChangeDutyCycle(0)

        if duration > 0:
            time.sleep(duration)
            self.move(Direction.STOP, 0, 0)

    def follow_path(self, waypoints):
        """Follow planned path"""
        print(f"Following path with {len(waypoints)} waypoints")

        for i, waypoint in enumerate(waypoints):
            print(f"Going to waypoint {i+1}: {waypoint}")

            # Simple approach: go to each waypoint
            dx = (waypoint[0] - self.x) * 0.3  # Convert grid to meters
            dy = (waypoint[1] - self.y) * 0.3

            # Calculate angle to waypoint
            target_angle = math.atan2(dy, dx)

            # Rotate to face waypoint
            while abs(self.theta - target_angle) > 0.1:
                if target_angle > self.theta:
                    self.move(Direction.LEFT, 50, 0.1)
                else:
                    self.move(Direction.RIGHT, 50, 0.1)

            # Move forward until reached
            distance = math.sqrt(dx*dx + dy*dy)
            duration = distance / 0.5  # Assume 0.5 m/s
            self.move(Direction.FORWARD, 80, duration)

            # Update position (simplified)
            self.x = waypoint[0] * 0.3
            self.y = waypoint[1] * 0.3

            print(f"✓ Reached waypoint {i+1}")

    def cleanup(self):
        """Clean up GPIO"""
        self.left_pwm.stop()
        self.right_pwm.stop()
        GPIO.cleanup()

# Example usage
if __name__ == "__main__":
    robot = DifferentialDriveRobot()

    try:
        # Test basic movement
        print("Moving forward...")
        robot.move(Direction.FORWARD, 100, 2)

        print("Turning left...")
        robot.move(Direction.LEFT, 80, 1)

        print("Test complete!")

    finally:
        robot.cleanup()
```

---

## Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Robot veers left/right | Wheel friction unbalanced | Calibrate PWM duty cycle for each wheel |
| Path doesn't follow plan | Encoder drift | Use IMU + encoder fusion |
| Slow planning | Large grid | Use hierarchical A* or RRT* |
| Gets stuck | Poor heuristic | Implement bidirectional A* |

---

## What's Next

- Implement SLAM (Simultaneous Localization and Mapping)
- Add camera-based obstacle detection
- Multi-robot coordination
- Check [Further Reading](/docs/resources/further-reading) for advanced topics

---

## References

- **A* Algorithm**: https://en.wikipedia.org/wiki/A*_search_algorithm
- **Robotics Control**: https://en.wikipedia.org/wiki/Differential_drive
- **Path Planning Survey**: Classic algorithms (Dijkstra, RRT, PRM)
