import asyncio
import websockets

# Store connected clients
clients = {}

async def register(websocket, user_id):
    clients[user_id] = websocket
    print(f"User {user_id} connected.")

async def unregister(user_id):
    del clients[user_id]
    print(f"User {user_id} disconnected.")

async def handle_client(websocket, path):
    user_id = path.strip("/")  # Unique ID from the URL path

    # Register client
    await register(websocket, user_id)

    try:
        async for message in websocket:
            # Relay the received video stream to other clients
            for user, conn in clients.items():
                if user != user_id:  # Don't send the message to the sender
                    await conn.send(message)  # Relay video stream to the other user
    except Exception as e:
        print(f"Error: {e}")
    finally:
        await unregister(user_id)

# Start the server on localhost:6789
async def main():
    server = await websockets.serve(handle_client, "localhost", 6789)
    print("WebSocket server is running on ws://localhost:6789")
    await server.wait_closed()

asyncio.run(main())
