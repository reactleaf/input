/**
 * default formatter based on Number.toString()
 */
export function formatNumber(value?: number) {
  if (value === undefined) return ""
  if (isNaN(value)) return ""
  const isScientific = value.toString().includes("e")
  if (isScientific) {
    const [decimal, exponential] = value.toString().split("e")
    const decimalLength = decimal.split(".")[1]?.length || 0
    const exponentialValue = Number(exponential)
    if (exponentialValue < 0) {
      return value.toFixed(-exponentialValue + decimalLength)
    }
    return value.toLocaleString("fullwide", { useGrouping: false })
  }
  return value.toString()
}

export function formatNumberWithCommas(value?: number) {
  if (value === undefined) return ""
  if (isNaN(value)) return ""
  const [numeric, fractional] = formatNumber(value).split(".")
  const numericWithComamas = numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  if (!fractional) {
    return numericWithComamas
  }
  return `${numericWithComamas}.${fractional}`
}
