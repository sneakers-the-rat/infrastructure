import Text.Pandoc.Definition
import Text.Pandoc.JSON (toJSONFilter)
import Text.Pandoc.Shared
import Data.Char(toLower)
import System.Process (readProcess)
import System.IO.Unsafe

main = toJSONFilter highlight

highlight :: Block -> Block
highlight (CodeBlock (_, options , _ ) code) = RawBlock (Format "html") (pygments code options)
highlight x = x

pygments:: String -> [String] -> String
pygments code options
         | (length options) == 1 = unsafePerformIO $ readProcess "pygmentize" ["-l", (map toLower (head options)),  "-f", "html"] code
         | (length options) == 2 = unsafePerformIO $ readProcess "pygmentize" ["-l", (map toLower (head options)), "-O linenos=inline",  "-f", "html"] code
         | otherwise = "<div class =\"highlight\"><pre>" ++ code ++ "</pre></div>"
