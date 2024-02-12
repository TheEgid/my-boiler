import { KyInstance } from "ky/distribution/types/ky";
import ky from "ky-universal";

const apiUrl = `/api/`;

export const apiRoot: KyInstance = ky.create({
    prefixUrl: apiUrl,
    credentials: "include",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    },
    retry: {
        limit: 3,
        methods: ["get", "post", "patch", "put"],
        statusCodes: [403],
        backoffLimit: 3000,
    },
});
