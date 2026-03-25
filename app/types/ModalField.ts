export type ModalField = {
    key: string,
    label: string,
    type: 'text' | 'textarea' | 'url' | 'email' | 'number',
    placeholder: string,
    required: boolean
}