import { SelectOption } from '../../models/select-option'

export const greaterThan         : SelectOption = { label: 'Greater Than'            , value: 'gt'     }
export const greaterThanOrEqualTo: SelectOption = { label: 'Greater Than Or Equal To', value: 'gte'    }
export const lesserThan          : SelectOption = { label: 'Lesser Than'             , value: 'lt'     }
export const lesserThanOrEqualTo : SelectOption = { label: 'Lesser Than Or Equal To' , value: 'lte'    }
export const equalTo             : SelectOption = { label: 'Equal To'                , value: 'eq'     }
export const notEqualTo          : SelectOption = { label: 'NOT Equal To'            , value: 'neq'    }
export const before              : SelectOption = { label: 'Before'                  , value: 'be'     }
export const beforeOrOn          : SelectOption = { label: 'Before Or On'            , value: 'beon'   }
export const after               : SelectOption = { label: 'After'                   , value: 'af'     }
export const afterOrOn           : SelectOption = { label: 'After Or On'             , value: 'afon'   }
export const matchesDate         : SelectOption = { label: 'Matches Date'            , value: 'dmatch' }

export const FILTER_CONDITION_OPTIONS: SelectOption[] = [
  greaterThan,
  greaterThanOrEqualTo,
  lesserThan,
  lesserThanOrEqualTo,
  equalTo,
  notEqualTo,
  before,
  beforeOrOn,
  after,             
  afterOrOn,
  matchesDate
]
