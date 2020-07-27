import { ClassKeyOfStyles, ClassNameMap } from '@material-ui/styles/withStyles'

export interface BasicStyledComponent {
  classes: ClassNameMap<ClassKeyOfStyles<string>>
}
