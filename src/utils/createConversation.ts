export const createConversation = async (conversationId: {
  current: string;
}) => {
  const response = await fetch("/api/createConversation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  conversationId.current = data.data.session_id;
};
