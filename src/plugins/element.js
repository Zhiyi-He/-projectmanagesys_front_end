import Vue from 'vue'
import {
    Button, Container, header, main, footer, Tabs, TabPane, Divider, Link, Row
    , Form, Input, FormItem, Message, Col, Scrollbar, Menu, MenuItem, Breadcrumb,
    BreadcrumbItem, Dropdown, DropdownItem, DropdownMenu, Submenu, Table, TableColumn,
    Select, Option, DatePicker, TimePicker, Switch, CheckboxGroup, Checkbox, RadioGroup,
    Radio, Alert, Tree, Loading, Cascader, Upload, MessageBox, Steps, Step, Dialog,
} from 'element-ui'

Vue.use(Dialog)
Vue.use(Button)
Vue.use(Container)
Vue.use(header)
Vue.use(main)
Vue.use(footer)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Divider)
Vue.use(Link)
Vue.use(Row)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Col)
Vue.use(Scrollbar)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Submenu)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Switch)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Alert)
Vue.use(Tree)
Vue.use(Loading)
Vue.use(Cascader)
Vue.use(Upload)
Vue.use(Steps)
Vue.use(Step)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
