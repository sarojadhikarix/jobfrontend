export class CustomJavascriptService {
  public appendToBody(src: string) {
    var existing = document.getElementById(src);
    if (existing != null) {
      return;
    }
      
    var element = document.createElement('script');
    element.setAttribute('type', 'text/javascript' );
    element.setAttribute('src', src);
    element.setAttribute('id', src);
    document.body.appendChild(element);
  }
    
  public removeFromBody(src: string) {
    var element = document.getElementById(src);
    element.parentNode.removeChild(element);
  }
}
