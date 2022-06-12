interface deviceProps {
  mobile: string
  ipad: string
  desktop: string
}

export const device: deviceProps = {
  mobile: `(max-width: 44em)`,
  ipad: `(min-width: 45em)`,
  desktop: `(min-width: 77em)`,
}

export const colorScheme: { [key: string]: string } = {
  backgroundPrimaryColor: 'hsl(0, 0%, 13%)',
  backgroundTransparentColor: 'hsl(0, 0%, 0%, 0.1)',

  textPrimaryColor: 'hsl(0, 0%, 0%)',
  textSecondaryColor: 'hsl(0, 0%, 100%)',
  textTransparentColor: 'hsla(0, 0%, 0%, 0.35)',
}

export const budgetColorscheme: { [key: string]: string } = {
  haveMonthBackground: 'hsl(101, 38%, 63%)',
  haveMonthTitles: 'hsl(101, 50%, 30%)',

  needMonthBackground: 'hsl(0, 66%, 64%)',
  needMonthTitles: 'hsl(0, 50%, 30%)',

  needYearBackground: 'hsl(31, 89%, 69%)',
  needYearTitles: 'hsl(31, 50%, 30%)',

  wantBackground: 'hsl(212, 63%, 81%)',
  wantTitles: 'hsl(212, 50%, 30%)',

  goalsBackground: 'hsl(257, 36%, 75%)',
  goalsTitles: 'hsl(257, 50%, 30%)',
}
