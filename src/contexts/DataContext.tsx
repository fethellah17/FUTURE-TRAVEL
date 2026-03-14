import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Voyage, Message } from "@/types";
import { mockVoyages, mockMessages } from "@/data/mockData";

interface DataContextType {
  voyages: Voyage[];
  messages: Message[];
  addVoyage: (voyage: Voyage) => void;
  updateVoyage: (id: string, voyage: Partial<Voyage>) => void;
  deleteVoyage: (id: string) => void;
  addMessage: (message: Omit<Message, "id" | "createdAt" | "isRead">) => void;
  markMessageAsRead: (id: string) => void;
  deleteMessage: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  // Initialiser avec les données mock
  const [voyages, setVoyages] = useState<Voyage[]>(mockVoyages);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  // Sauvegarder dans localStorage pour persistance (optionnel)
  useEffect(() => {
    const savedVoyages = localStorage.getItem("voyages");
    const savedMessages = localStorage.getItem("messages");
    
    if (savedVoyages) {
      try {
        setVoyages(JSON.parse(savedVoyages));
      } catch (e) {
        console.error("Error loading voyages from localStorage", e);
      }
    }
    
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Error loading messages from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("voyages", JSON.stringify(voyages));
  }, [voyages]);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const addVoyage = (voyage: Voyage) => {
    setVoyages((prev) => [voyage, ...prev]);
  };

  const updateVoyage = (id: string, updatedFields: Partial<Voyage>) => {
    setVoyages((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updatedFields } : v))
    );
  };

  const deleteVoyage = (id: string) => {
    setVoyages((prev) => prev.filter((v) => v.id !== id));
  };

  const addMessage = (messageData: Omit<Message, "id" | "createdAt" | "isRead">) => {
    const newMessage: Message = {
      ...messageData,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    setMessages((prev) => [newMessage, ...prev]);
  };

  const markMessageAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
    );
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        voyages,
        messages,
        addVoyage,
        updateVoyage,
        deleteVoyage,
        addMessage,
        markMessageAsRead,
        deleteMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
