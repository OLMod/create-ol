import { definePlugin } from "@ol/utils/plugins";
import { Logger } from "@ol/utils";

const logger = new Logger("&OL.Plug.Name");

export default definePlugin({
    name: "&OL.Plug.Name",
    description: "&OL.Plug.Desc",
    authors: [
        {
            name: "&OL.Author.Name",
            id: &OL.Author.IDn,
        }
    ],
    patches: [],
    start() {
        // Your plugin start logic here
    },
    stop() {
        // Your plugin stop logic here
    }
})
