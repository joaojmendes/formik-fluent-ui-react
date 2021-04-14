import { initializeIcons } from '@fluentui/react/lib/Icons'
import { storiesOf } from '@storybook/react'
import { FormikCheckboxStory } from './FormikCheckbox.story'
import { FormikChoiceGroupStory } from './FormikChoiceGroup.story'
import { FormikColorPickerStory } from './FormikColorPicker.story'
import { FormikDatePickerStory } from './FormikDatePicker.story'
import { FormikDropdownStory } from './FormikDropdown.story'
import { FormikComboBoxStory } from './FormikComboBox.story'
import { FormikPeoplePickerStory } from './FormikPeoplePicker.story'
import { FormikRatingStory } from './FormikRating.story'
import { FormikSliderStory } from './FormikSlider.story'
import { FormikSpinButtonStory } from './FormikSpinButton.story'
import { FormikSwatchColorPickerStory } from './FormikSwatchColorPicker.story'
import { FormikTextFieldStory } from './FormikTextField.story'
import { FormikToggleStory } from './FormikToggle.story'

initializeIcons()

storiesOf('formik-fluent-ui-react', module)
  .add('FormikCheckbox', FormikCheckboxStory)
  .add('FormikChoiceGroup', FormikChoiceGroupStory)
  .add('FormikColorPicker', FormikColorPickerStory)
  .add('FormikDatePicker', FormikDatePickerStory)
  .add('FormikDropdown', FormikDropdownStory)
  .add('FormikComboBox', FormikComboBoxStory)
  .add('FormikPeoplePicker', FormikPeoplePickerStory)
  .add('FormikRating', FormikRatingStory)
  .add('FormikSlider', FormikSliderStory)
  .add('FormikSpinButton', FormikSpinButtonStory)
  .add('FormikSwatchColorPicker', FormikSwatchColorPickerStory)
  .add('FormikTextField', FormikTextFieldStory)
  .add('FormikToggle', FormikToggleStory)
