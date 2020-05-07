export const ENTER_DATA_BEGIN   = 'ENTER_DATA_BEGIN';
export const ENTERING_DATA      = 'ENTERING_DATA';
export const ENTER_DATA_END     = 'ENTER_DATA_END';

export const enteringDataStages = {
    EMAIL: 'EMAIL',
    PASSWORD: 'PASSWORD',
    FINISH: 'FINISH'
};

export function enterDataBegin() {
    return {type: ENTER_DATA_BEGIN}; 
};

export function enteringData(stage, data) {
    return {type: ENTERING_DATA, stage, data};
};

export function enterDataEnd(stage, validationResult){
    return {type: ENTER_DATA_END, stage, error: validationResult.error, errorMessage: validationResult.errorMessage};
};