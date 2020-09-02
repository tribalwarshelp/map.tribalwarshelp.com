export const LANG_VERSIONS_QUERY = `
    query {
        langVersions(filter: { sort: "host ASC" }) {
            total
            items {
                tag
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
