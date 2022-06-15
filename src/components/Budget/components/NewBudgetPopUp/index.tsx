import type { FC } from 'react'

import type { FormDataType } from 'components/Form'
import { Form } from 'components/Form'
import { PopUp } from 'components/PopUp'
import { useUser } from 'contexts/User'
import { createNewBudget } from 'services/budget'

import type { DataContentOptions } from '../../../../services/budget/types'

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

export const NewBudgetPopUp: FC<Props> = ({ visibility, onClose }) => {
  const { user } = useUser()

  const handleCreateNewBudget = async ({
    title,
    description,
  }: FormDataType): Promise<void> => {
    if (!user) {
      return
    }

    if (title === '') {
      return
    }

    await createNewBudget(user.uid, title, description)
      .then(onClose)
      .then(() => void window.location.reload())
  }

  return (
    <PopUp
      visibility={visibility}
      headerTitleText="Do you want to create new budget?"
      onClose={onClose}
    >
      <Form
        actionOnSubmit={handleCreateNewBudget}
        submitButtonText="CREATE NEW BUDGET"
        formInputs={[
          { identifier: 'title', label: 'TITLE', placeholder: 'My Budget' },
          {
            identifier: 'description',
            label: 'DESCRIPTION',
            placeholder: 'This is a budget I will use to track my finances.',
          },
        ]}
      >
        <input type="text" />
      </Form>
    </PopUp>
  )
}
