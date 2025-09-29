import { CuratingType } from '@services/types'
import CuratingLayout from '../ui-curating/CuratingLayout'
import CuratingOptionButtons from './CuratingOptionButtons'

type CuratingProps = {
  styleId: string
  curating: CuratingType
}

const Curating = ({ curating, styleId }: CuratingProps) => {
  return (
    <CuratingLayout
      curating={curating}
      optionButtons={<CuratingOptionButtons curating={curating} styleId={styleId} />}
    />
  )
}

export default Curating
