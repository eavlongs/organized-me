export type Folder = {
    id: string;
    name: string;
    userId: string;
    parents: { id: string; name: string }[];
    parentId: string | null;
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
    folders: Folder[];
    files: _File[];
    parents: { id: string; name: string }[];
};

export type FileOrFolder = {
    object: {
        type: "folder" | "file" | null;
        property: Folder | _File | null;
    };
};
