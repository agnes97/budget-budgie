// Import JSON data to Firestore!

import { data } from "../public/data/personal-data.json"
import { firestore } from "../src/services/firebase"
import { doc, setDoc } from "firebase/firestore"

const categories = data.reduce((categories, record) => 
    ({ ...categories, [record.class]: record.content }), {})

const addCategories = async () => {
    try {
        await setDoc(doc(firestore, "budgets", "personal-data"), { categories })
    } catch (e) {
        console.error("Error adding document: ", e)
    }
}

addCategories()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))

// GitBash: set -o allexport; source .env.development; set +o allexport; ts-node-script scripts/migrate.ts