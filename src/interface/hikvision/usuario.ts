export interface IUsuario {
    UserInfo: UserInfo
  }
  
  export interface UserInfo {
    employeeNo: string
    name: string
    userType: string
    Valid: Valid
  }
  
  export interface Valid {
    enable: boolean
    beginTime: string
    endTime: string
  }