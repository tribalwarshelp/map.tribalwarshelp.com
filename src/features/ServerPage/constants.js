export const SERVER_QUERY = `
    query servers($filter: ServerFilter!) {
        servers(filter: $filter) {
            items {
                key
                dataUpdatedAt
                numberOfPlayers
                numberOfTribes
                numberOfVillages
                langVersion {
                    tag
                }
                config {
                    coord {
                        mapSize
                    }
                }
            }
        }
    }
`;
