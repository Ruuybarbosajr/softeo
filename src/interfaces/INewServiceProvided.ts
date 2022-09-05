interface INewServiceProvided { 
  clientId: string
  serviceId: string
  installmentsContracted: number
  installmentsPaid: number
  obs?: string
}

export default INewServiceProvided;