export interface CreateConversationModel {
    user2: string;
    text: string;
}

export interface ConversationModel {
    id: string;
    firstname: string;
    lastname: string;
    lastmessage: LastMessageConversationModel
    createdAt: string;
}

export interface LastMessageConversationModel {
    lastSenderlastname: string;
    lastSenderfirstname: string;
    message: string
}

export interface AllConversationmodel{
    id: string;
    content: string;
    sender: {
        id: string;
        name: string;
    }
    createdAt: string;
}

export interface CreateMessageModel {
    conversationId : string;
    text: string;
}