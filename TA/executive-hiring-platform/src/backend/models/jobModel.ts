export interface Job {
    id: string;
    title: string;
    description: string;
    requirements: string[];
    location: string;
    company: string;
    postedDate: Date;
    applicationDeadline: Date;
    status: 'open' | 'closed';
}

export class JobModel {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public requirements: string[],
        public location: string,
        public company: string,
        public postedDate: Date,
        public applicationDeadline: Date,
        public status: 'open' | 'closed'
    ) {}
}