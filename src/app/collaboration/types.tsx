export type Collaboration = {
    uid: string;
    instagramPhotos: number;
    instagramStories: number;
    tiktokVideos: number;
    topic: string;
    description: string;
    startDate: Date;
    durationType: string;
    instagramVideos: number;
    isPrivate: boolean;
    userUid: string;
    updatedAt: Date;
    createdAt: Date;
    finishDate: Date | null;
};
