export const VERSIONS_QUERY = `
    query {
        versions(filter: { sort: "host ASC" }) {
            total
            items {
                code
                host
            }
        }
    }
`;

export const SERVERS_QUERY = `
    query servers($filter: ServerFilter) {
        servers(filter: $filter) {
            items {
                key
            }
        }
    }
`;
