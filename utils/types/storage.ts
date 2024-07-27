export type Folder = {
    id: string;
    name: string;
    userId: string;
    parents: { id: string; name: string }[];
    createdAt: Date;
    updatedAt: Date;
};

export type _File = {
    id: string;
    userId: string;
    folderId: string;
    name: string;
    filePath: string;
    createdAt: Date;
    updatedAt: Date;
};

export type GetFolderResponse = {
    folder: Folder | null;
    folders: FolderMetaData[];
    files: _File[];
    parents: { id: string; name: string }[];
};

export type FolderMetaData = Omit<Folder, "parents">;
