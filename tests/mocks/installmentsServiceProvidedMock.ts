import IInstallmentsServiceProvided from '../../src/interfaces/IInstallmentsServiceProvided';

export const installmentsReadAllMock: IInstallmentsServiceProvided[] = [{
  serviceProvided: {
    id: "1d530714-967e-4615-ad88-c16c43e97789",
    client: {
      id: "333a9138-b6f2-467f-ba40-ee7158ea50fb",
      name: "Bianca Louzada Silveira Fernandes",
      email: "biancafernandes12@hotmail.com",
      tel: "33983561248"
    },
    service: {
      id: "45905a74-50f4-4176-9a51-3e558bc9b293",
      name: "Pulpectomia",
      price: 150,
      maxInstallments: 3
    },
    installmentsContracted: 3,
    installmentsPaid: 1,
    createdAt: new Date('2022-09-09T08:12:14.640Z'),
    obs: "",
    installmentsServiceProvided: [
      {
        dateInstallment: new Date('2022-09-09T08:12:14.640Z'),
        numberInstallment: 2,
        priceInstallment: 50,
        serviceProvidedId: '1d530714-967e-4615-ad88-c16c43e97789',
        serviceProvided: {
          client: { name: 'Bianca Louzada Silveira Fernandes' },
          service: { name: 'Pulpectomia' }
        }
      }
    ]
  }
}]