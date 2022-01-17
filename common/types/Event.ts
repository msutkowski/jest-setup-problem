import { GeolocationData } from "./GeolocationData";

type Event = {
	id: number;
	name: string;
	description: string;
	price: string;
	ticketsLeft: number;
	tags: string[];
	location: GeolocationData;
}

type EventData = {
	tagsNearby: string[];
	events: Event[];
}

export type { Event };
export type { EventData };
