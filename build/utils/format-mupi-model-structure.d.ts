declare type FormattedMupiModelItemStructure = {
    key: string;
    description: string;
    upload?: boolean;
    id?: boolean;
};
declare type FormattedMupiModelStructure = {
    title: string;
    subtitle?: string;
    items: FormattedMupiModelItemStructure[];
};
export declare function formatThenResolveMupiModelStructure(MupiModel: any): FormattedMupiModelStructure | boolean;
export {};
