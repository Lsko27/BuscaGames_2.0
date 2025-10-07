// types/quest.ts
export enum QuestStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface Quest {
  id: string
  title: string
  description: string
  points: number
  progress: number
  totalSteps: number
  type: "DAILY" | "WEEKLY"
  status: QuestStatus
}
