package com.vzh.iherych.Controller;

import com.vzh.iherych.Model.Fact;
import com.vzh.iherych.Service.FactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fact")
@RequiredArgsConstructor
public class FactController {
    private final FactService factService;

    @PostMapping()
    public ResponseEntity<Fact> save(@RequestBody Fact fact) {
        return factService.save(fact) != null ? ResponseEntity.ok(fact) : ResponseEntity.badRequest().build();
    }

    @GetMapping("/random")
    public Fact findRandomFact() {
        return factService.findRandomFact();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        factService.delete(id);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Fact>> findAll() {
        return ResponseEntity.ok(factService.findAll());
    }
}
