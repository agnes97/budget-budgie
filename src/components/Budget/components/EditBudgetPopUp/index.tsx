import type { FC } from 'react'
import { useState } from 'react'

import { Form } from 'components/Form'
import { PopUp } from 'components/PopUp'
import { useBudgetData } from 'contexts/Budget'

import { StyledAlert, StyledDetails } from './styled'

import type {
  BudgetInfo,
  DataContentOptions,
} from '../../../../services/budget/types'
import { ButtonContainer } from '../ButtonContainer'

export interface PopUpData {
  index?: number
  emoji?: DataContentOptions['emoji']
  item?: DataContentOptions['item']
  note?: DataContentOptions['note']
}

type Props = PopUpData & {
  onClose: () => void
  visibility: boolean
}

export const EditBudgetPopUp: FC<Props> = ({ visibility, onClose }) => {
  const { budgetInfo, updateBudgetInfo } = useBudgetData()
  const [titleDetailsOpen, setTitleDetailsOpen] = useState(false)
  const [descriptionDetailsOpen, setDescriptionDetailsOpen] = useState(false)

  const handleUpdateBudgetInfo = async (
    type: keyof BudgetInfo,
    newBudgetInfo: string
  ): Promise<void> => {
    await updateBudgetInfo(type, newBudgetInfo)
  }

  return (
    <PopUp
      visibility={visibility}
      headerTitleText={`Do you want to edit "${budgetInfo.title}"?`}
      onClose={() => {
        onClose()
        setTitleDetailsOpen(false)
        setDescriptionDetailsOpen(false)
      }}
    >
      <StyledDetails open={titleDetailsOpen}>
        <summary
          onClick={(toggleEvent) => {
            toggleEvent.preventDefault() // Prevent automatic adding of "open" attr to <details>
            setTitleDetailsOpen(!titleDetailsOpen)
          }}
        >
          EDIT TITLE
        </summary>
        <Form
          formIdentifier="updateTitleForm"
          actionOnSubmit={async (formData) =>
            void (await handleUpdateBudgetInfo('title', formData.title))
          }
          formInputs={[
            {
              typeOfInput: 'input',
              identifier: 'title',
              label: 'TITLE',
              placeholder: budgetInfo.title,
            },
          ]}
          displayLabels={false}
        />
        <ButtonContainer
          buttonsParameters={[
            { value: '✔️ EDIT', type: 'submit', form: 'updateTitleForm' },
            {
              value: '⛔ CANCEL',
              onClick: () => void setTitleDetailsOpen(false),
            },
          ]}
        />
      </StyledDetails>
      <StyledDetails open={descriptionDetailsOpen}>
        <summary
          onClick={(toggleEvent) => {
            toggleEvent.preventDefault() // Prevent automatic adding of "open" attr to <details>
            setDescriptionDetailsOpen(!descriptionDetailsOpen)
          }}
        >
          EDIT DESCRIPTION
        </summary>
        <Form
          formIdentifier="updateDescriptionForm"
          actionOnSubmit={async (formData) =>
            void (await handleUpdateBudgetInfo(
              'description',
              formData.description
            ))
          }
          formInputs={[
            {
              typeOfInput: 'textarea',
              identifier: 'description',
              label: 'DESCRIPTION',
              placeholder: budgetInfo.description,
            },
          ]}
          displayLabels={false}
        />
        <ButtonContainer
          buttonsParameters={[
            { value: '✔️ EDIT', type: 'submit', form: 'updateDescriptionForm' },
            {
              value: '⛔ CANCEL',
              onClick: () => void setDescriptionDetailsOpen(false),
            },
          ]}
        />
      </StyledDetails>
      <StyledAlert>Please reload the page to view your changes!</StyledAlert>
    </PopUp>
  )
}
