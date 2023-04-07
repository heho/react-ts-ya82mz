import * as React from 'react';

const useEnterSubmit = (cb: (formData: FormData) => void) => {
  const enterKeyPressed = React.useRef(false);

  return React.useMemo(() => {
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();

      if (enterKeyPressed.current) {
        const data = new FormData(event.currentTarget);
        cb(data);
      } else {
        console.log('other method was used');
      }
    };

    const handleKeydown: React.KeyboardEventHandler = (event) => {
      if (event.key === 'Enter') enterKeyPressed.current = true;
    };

    const handleKeyup: React.KeyboardEventHandler = (event) => {
      if (event.key === 'Enter') enterKeyPressed.current = false;
    };

    return {
      onSubmit: handleSubmit,
      onKeyDown: handleKeydown,
      onKeyUp: handleKeyup,
    };
  }, [cb]);
};

const authenticate = (formData: FormData) =>
  console.log(formData.get('credentials'));

export default function App() {
  const handleEnterSubmit = useEnterSubmit(authenticate);

  return (
    <form {...handleEnterSubmit}>
      <label htmlFor="credentials">Credentials</label>
      <input type="text" name="credentials" id="credentials" />
      <button type="submit">Submit!</button>
    </form>
  );
}
