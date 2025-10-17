from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from anthropic import Anthropic
import os
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

# Initialiser l'application FastAPI
app = FastAPI(title="Claude Haiku Chat API")

# Configuration CORS pour permettre les requêtes du frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Ports Vue dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialiser le client Anthropic
api_key = os.getenv("ANTHROPIC_API_KEY")
if not api_key:
    raise ValueError("ANTHROPIC_API_KEY not found in environment variables")

client = Anthropic(api_key=api_key)

# 🔍 DEBUG - Ajouter juste après la ligne précédente
print("\n" + "="*50)
print("✅ Backend démarré avec succès!")
print(f"✅ Clé API chargée: OUI")
print(f"✅ Serveur prêt sur http://127.0.0.1:8000")
print("="*50 + "\n")

# Modèles Pydantic pour les requêtes
class Message(BaseModel):
    role: str  # "user" ou "assistant"
    content: str

class ChatRequest(BaseModel):
    messages: list[Message]
    system_prompt: str = "Tu es un assistant utile et amical. Réponds en français."

class ChatResponse(BaseModel):
    response: str
    status: str

# Stocker l'historique des conversations (en mémoire pour la démo)
conversation_history = []

@app.get("/")
async def root():
    """Route de vérification"""
    return {"message": "Bienvenue sur l'API Claude Haiku Chat!", "status": "ready"}

@app.post("/chat")
async def chat(request: ChatRequest):
    """
    Endpoint principal pour communiquer avec Claude Haiku
    
    Args:
        request: Contient les messages et le system prompt
    
    Returns:
        ChatResponse avec la réponse de Claude
    """
    try:
        print(f"DEBUG: Reçu un message de l'utilisateur")
        print(f"DEBUG: Nombre de messages: {len(request.messages)}")
        
        # Convertir les messages Pydantic en dictionnaires
        messages_dict = [
            {"role": msg.role, "content": msg.content}
            for msg in request.messages
        ]
        
        # Ajouter à l'historique
        conversation_history.extend(messages_dict)
        
        print(f"DEBUG: Appel de l'API Anthropic...")
        print(f"DEBUG: Clé API définie: {bool(api_key)}")
        
        # Appeler l'API Anthropic
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1024,
            system=request.system_prompt,
            messages=conversation_history
        )
        
        # Extraire la réponse
        assistant_message = response.content[0].text
        
        # Ajouter la réponse à l'historique
        conversation_history.append({
            "role": "assistant",
            "content": assistant_message
        })
        
        print(f"DEBUG: Réponse reçue avec succès")
        
        return ChatResponse(
            response=assistant_message,
            status="success"
        )
        
    except Exception as e:
        print(f"ERROR: {str(e)}")
        import traceback
        print(f"TRACEBACK: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/reset")
async def reset():
    """Reset l'historique de la conversation"""
    global conversation_history
    conversation_history = []
    return {"message": "Conversation réinitialisée", "status": "success"}

@app.get("/history")
async def get_history():
    """Récupère l'historique complet de la conversation"""
    return {"history": conversation_history}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)