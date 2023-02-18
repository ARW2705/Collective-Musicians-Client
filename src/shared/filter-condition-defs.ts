import { SelectOption } from '../models/interfaces'

export const FILTER_CONDITION_OPTIONS: SelectOption[] = [
  { label: 'Greater Than'            , value: 'gt'     },
  { label: 'Greater Than Or Equal To', value: 'gte'    },
  { label: 'Lesser Than'             , value: 'lt'     },
  { label: 'Lesser Than Or Equal To' , value: 'lte'    },
  { label: 'Equal To'                , value: 'eq'     },
  { label: 'NOT Equal To'            , value: 'neq'    },
  { label: 'Before'                  , value: 'be'     },
  { label: 'Before Or On'            , value: 'beon'   },
  { label: 'After'                   , value: 'af'     },
  { label: 'After Or On'             , value: 'afon'   },
  { label: 'Matches Date'            , value: 'dmatch' }
]
