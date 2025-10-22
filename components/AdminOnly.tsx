import React from "react";
import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

interface AdminOnlyProps {
  children: React.ReactNode;
}

export const AdminOnly: React.FC<AdminOnlyProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (!user) {
        setIsAdmin(false);
        return;
      }
      const userDoc = await getDoc(doc(db, "users", user.uid));
      setIsAdmin(userDoc.exists() && userDoc.data().isAdmin === true);
    };
    checkAdmin();
  }, []);

  if (isAdmin === null) return null; // or a loading spinner
  if (!isAdmin) return null; // or a message: "Admins only"
  return <>{children}</>;
};
