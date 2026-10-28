export type DriverLicense = {
    number: string;
    state: string;
    class: string;
    expirationDate: Date;
    documents: {
        frontKey: string;
        backKey: string;
    };
};

export type DriverEssentialProperties = Required<{
    id: string;

    firstName: string;
    lastName: string;

    phone: string;
    email: string;

    driverLicense: DriverLicense;

    createdAt: Date;
}>;

export type DriverOptionalProperties = Partial<{
    updatedAt: Date;
}>;

export type DriverProperties = 
    DriverEssentialProperties & DriverOptionalProperties;