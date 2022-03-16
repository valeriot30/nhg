export default class Container
{
    private domNode: HTMLDivElement

    constructor()
    {
        this.domNode = document.createElement("div")
        this.domNode.style.position = "absolute"
    }

    public removeChildren()
    {
        this.domNode.innerHTML = ''
    }

    public appendChild(child: HTMLElement)
    {
        this.domNode.appendChild(child)
    }

    public getChildren()
    {
        return this.domNode.children
    }

    public destroy()
    {
        this.domNode.remove()
    }

    public getDomNode()
    {
        return this.domNode
    }
}