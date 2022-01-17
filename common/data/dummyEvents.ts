import { Event, EventData } from "../types/Event";

const events: Event[] = [
    {
        id: 0,
        name: "INSP Music quiz",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida mauris justo, ac porta nunc cursus at. In hac habitasse platea dictumst. Etiam sit amet dignissim enim. Vestibulum turpis felis, sollicitudin ac ligula placerat, interdum ultrices justo. Nam volutpat enim tellus, ac laoreet elit gravida sed. Nulla varius, turpis et imperdiet tincidunt, nunc nisi maximus erat, a ultrices ipsum ipsum eu justo. Donec mauris velit, varius ac metus sed, egestas tincidunt felis. ",
        price: "4.99",
        ticketsLeft: 2,
        tags: ["music", "quiz", "competition"],
        location: {
            latitude: 37.42001074113098,
            longitude: -122.08059998229146
        }
    },
    {
        id: 1,
        name: "INSP Music quiz 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida mauris justo, ac porta nunc cursus at. In hac habitasse platea dictumst. Etiam sit amet dignissim enim. Vestibulum turpis felis, sollicitudin ac ligula placerat, interdum ultrices justo. Nam volutpat enim tellus, ac laoreet elit gravida sed. Nulla varius, turpis et imperdiet tincidunt, nunc nisi maximus erat, a ultrices ipsum ipsum eu justo. Donec mauris velit, varius ac metus sed, egestas tincidunt felis. ",
        price: "4.99",
        ticketsLeft: 2,
        tags: ["music", "quiz", "competition"],
        location: {
            latitude: 37.420688443066446,
            longitude: -122.0872495137155
        }
    }
];

const eventData: EventData = {
    tagsNearby: [
        "music",
        "quiz",
        "competition",
        "sport",
        "hackathon",
        "party"
    ],
    events: events,
}

export default eventData;
