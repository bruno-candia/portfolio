export interface Skill {
  id: string;
  category: string;
  stacks: Stack[];
}

export interface Stack {
  name: string;
  icon?: string;
}
