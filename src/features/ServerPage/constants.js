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

export const PLAYERS_QUERY = `
    query players($server: String!, $filter: PlayerFilter!) {
        players(server:$server, filter: $filter) {
            items {
                id
                name
            }
        }
    }
`;

export const TRIBES_QUERY = `
    query tribes($server: String!, $filter: TribeFilter!) {
        tribes(server:$server, filter: $filter) {
            items {
                id
                tag
            }
        }
    }
`;
