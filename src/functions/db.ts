import StormDB from "stormdb";


export function get_database(
        db: StormDB, 
        id: string
    )
{
    try {
        return db.get("users").value().filter((user: UserDatabase) => user.userid == id)
    } catch (err) {
        return []
    }
}


export async function set_database(
        db: StormDB,
        id: string,
        attributeset: "quote" | "location",
        data: string
    )
{
    let response;

    try {
        response = db.get("users").value().filter((i: any) => i.userid == id);
    } catch (err) {
        response = []
    }

    const length = db.get("users").length()

    if (response.length != 0) { // finds the user and changes the value in an attribute
        for (let i = 0; i <= length.value(); i++) {
            const user = db.get("users").get(i)

            if (user.get("userid").value() == id) {
                user.get("attributes").get(attributeset).set(data)
                break;
            }

        }
    } else {
        const users = {
            userid: id,
            attributes: {
                quote: "",
                location: ""
            }
        }
        if (attributeset == "quote") {
            users.attributes.quote = data
        } 
        if (attributeset == "location") {
            users.attributes.location = data
        }


        db.get("users").push(users)
    }
    db.save()
}

type UserDatabase = {
    userid: string,
    attributes: {
        quote: string,
        location?: string,
        [key: string]: any
    }
}