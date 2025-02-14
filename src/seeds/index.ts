import db from "../config/connection";
import cleanDB from "./cleanDB";


try {
    await db();
    await cleanDB();
}