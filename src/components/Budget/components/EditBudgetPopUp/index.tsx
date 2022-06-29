import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'

import type { FormInput } from 'components/Form'
import { Form } from 'components/Form'
import { PopUp } from 'components/PopUp'
import { useBudgetData } from 'contexts/Budget'
import { useUser } from 'contexts/User'
import { getBudgetsByUserId } from 'services/budget'

import { StyledDetails } from './styled'

import type {
  Budget,
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
  const { user } = useUser()
  const [usersBudgets, setUsersBudgets] = useState<Budget[]>([])
  const [titleDetailsOpen, setTitleDetailsOpen] = useState(false)
  const [descriptionDetailsOpen, setDescriptionDetailsOpen] = useState(false)
  const [deleteBudgetDetailsOpen, setDeleteBudgetDetailsOpen] = useState(false)

  const handleUpdateBudgetInfo = async (
    type: keyof BudgetInfo,
    newBudgetInfo: string
  ): Promise<void> => {
    await updateBudgetInfo(type, newBudgetInfo)
  }

  const handleDeleteBudget = (
    budgetTitleConfirmation: string,
    newActiveBudgetTitle: string
  ): void => void console.log(budgetTitleConfirmation, newActiveBudgetTitle)

  useEffect(() => {
    const getBudgetsByUserList = async (): Promise<Budget[]> => {
      if (!user) {
        return []
      }

      return await getBudgetsByUserId(user.uid)
    }

    void getBudgetsByUserList().then((budgets) => void setUsersBudgets(budgets))
  }, [user])

  const findSelectableBudgets = useCallback(
    (): FormInput['selectOptions'] =>
      usersBudgets
        .map((budget) => ({
          optionValue: budget.id,
          optionTitle: budget.title,
        }))
        // Without current active budget!
        .filter(({ optionTitle }) => optionTitle !== budgetInfo.title),
    [budgetInfo.title, usersBudgets]
  )

  return (
    <PopUp
      visibility={visibility}
      headerTitleText={`"${budgetInfo.title}" SETTINGS`}
      onClose={() => {
        onClose()
        setTitleDetailsOpen(false)
        setDescriptionDetailsOpen(false)
      }}
    >
      {/* UPDATE BUDGET TITLE */}
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

      {/* UPDATE BUDGET DESCRIPTION */}
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

      {/* DELETE BUDGET */}
      <StyledDetails open={deleteBudgetDetailsOpen}>
        <summary
          onClick={(toggleEvent) => {
            toggleEvent.preventDefault() // Prevent automatic adding of "open" attr to <details>
            setDeleteBudgetDetailsOpen(!deleteBudgetDetailsOpen)
          }}
        >
          DELETE BUDGET &quot;{budgetInfo.title}&quot;
        </summary>
        <Form
          formIdentifier="deleteBudgetForm"
          actionOnSubmit={(formData) =>
            void handleDeleteBudget(
              formData.deletedBudgetTitle,
              formData.newActiveBudgetBudgetId
            )
          }
          formInputs={[
            {
              typeOfInput: 'select',
              identifier: 'newActiveBudgetBudgetId',
              label:
                "Choose your new active budget! You can't delete your budget it you only have one.",
              placeholder: 'New active budget',
              required: true,
              selectOptions: findSelectableBudgets(),
            },
            {
              typeOfInput: 'input',
              identifier: 'deletedBudgetTitle',
              label:
                'Fill in title of the budget you want to delete to confirm. :)',
              placeholder: budgetInfo.title,
              required: true,
            },
          ]}
        />
        <ButtonContainer
          buttonsParameters={[
            { value: '✔️ EDIT', type: 'submit', form: 'deleteBudgetForm' },
            {
              value: '⛔ CANCEL',
              onClick: () => void setDeleteBudgetDetailsOpen(false),
            },
          ]}
        />
      </StyledDetails>
    </PopUp>
  )
}
