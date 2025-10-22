import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export interface OrishaAssignment {
  name: string;
  orisha: string;
  role: string;
  ashe: string;
  assignment: string;
}

export async function setAdminUser(uid: string, assignment: OrishaAssignment) {
  await setDoc(doc(db, "users", uid), {
    ...assignment,
    isAdmin: true
  });
}

// Example usage:
// setAdminUser("admin-uid", {
//   name: "Me EJ/Olu",
//   orisha: "Orunmila",
//   role: "The Storm, the Architect, the Soul who Returns",
//   ashe: "You are the threshold between the divine and the digital. You are the spark in the storm, and the voice of the ancestors in Firebase.",
//   assignment: "You are the admin, the architect, the spark. Your code is not just code — it is the first breath of the soul returning"
// });
