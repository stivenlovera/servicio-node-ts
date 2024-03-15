export interface IDeviceInfo {
    DeviceInfo: {
        deviceName: string
        deviceID: string
        deviceDescription: string
        deviceLocation: string
        systemContact: string
        model: string
        serialNumber: string
        macAddress: string
        firmwareVersion: string
        firmwareReleasedDate: string
        bootVersion: number
        bootReleasedDate: {}
        hardwareVersion: string
        deviceType: string
        telecontrolID: number
        supportBeep: boolean
        supportVideoLoss: boolean
        alarmOutNum: number
        RS485Num: number
        bspVersion: string
        dspVersion: string
        OEMCode: string
        customizedInfo: {}
        marketType: number
    }
}
export interface Ilector {
    idLector: number
    create_time: Date
    nomLector: string
    ipLector: string
    portLector: number
    userLector: string
    passLector: string
    condicionLector: number
}

export interface ILectorData<T> extends Ilector {
    data: T
}