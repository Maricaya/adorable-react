type SourceDataItem = {
  text: string,
  value: string,
  children?: SourceDataItem[]
}

type TreeProps = {
  sourceData: SourceDataItem[],
} & ({
  selected: string[], multiple: true,
  onChange: (newSelected: string[]) => void
} | {
  selected: string, multiple: false,
  onChange: (newSelected: string) => void
})

